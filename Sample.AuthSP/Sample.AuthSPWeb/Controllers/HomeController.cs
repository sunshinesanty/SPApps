using Microsoft.SharePoint.Client;
using Sample.AuthSPWeb.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Sample.AuthSPWeb.Controllers
{
    public class HomeController : Controller
    {
        private Uri sharePointSiteUrl = new Uri(ConfigurationManager.AppSettings.Get("SPSiteUrl"));

        [SharePointContextFilter]
        public ActionResult Index()
        {
            ListDataCollection coll = new ListDataCollection();

            //coll = GetClientContextData(coll);
            coll = GetAppOnlyContextData(coll);
            return View(coll);


        }

        private ListDataCollection GetAppOnlyContextData(ListDataCollection coll)
        {
            try
            {
                string realm = TokenHelper.GetRealmFromTargetUrl(sharePointSiteUrl);
                var token = TokenHelper.GetAppOnlyAccessToken(TokenHelper.SharePointPrincipal, sharePointSiteUrl.Authority, realm).AccessToken;
                
                using (var clientContext = TokenHelper.GetClientContextWithAccessToken(sharePointSiteUrl.ToString(), token))
                {
                    if (clientContext != null)
                    {
                        var list = clientContext.Web.Lists.GetByTitle(ConfigurationManager.AppSettings.Get("ListName"));
                        CamlQuery q = new CamlQuery();
                        q.ViewXml = "<View><Query><OrderBy FieldRef='ID' Ascending='False'/></Query></View>";
                        var items = list.GetItems(q);
                        clientContext.Load(items);

                        clientContext.ExecuteQuery();

                        return populateData(items);

                    }
                }
            }
            catch (ThreadAbortException)
            {
                //do nothing 
            }
            catch (Exception ex)
            {
                coll.Add(new ListDataModel() { ContentType = "", Created = DateTime.MinValue, CreatedBy = "", Modified = DateTime.MinValue, ModifiedBy = "", Title = "No data found :" + ex.Message });
            }
            return coll;
        }

        private ListDataCollection GetClientContextData(ListDataCollection coll) {
            try
            {
                string authcode = this.Request.QueryString["code"];
                if (!string.IsNullOrEmpty(authcode))
                    TokenCache.UpdateCacheWithCode(this.Request, this.Response, sharePointSiteUrl);
                if (!string.IsNullOrEmpty(this.Request.QueryString["error"]))
                {
                    coll.Add(new ListDataModel() { ContentType = "", Created = DateTime.MinValue, CreatedBy = "", Modified = DateTime.MinValue, ModifiedBy = "", Title = "Error :" + this.Request.QueryString["error_description"] });
                    return coll;
                }
                if (!TokenCache.IsTokenInCache(this.Request.Cookies))
                    this.Response.Redirect(TokenHelper.GetAuthorizationUrl(sharePointSiteUrl.ToString(), "Web.Write", ConfigurationManager.AppSettings.Get("RedirectUrl")));
                else {
                    string refreshToken = !string.IsNullOrEmpty(authcode) ? authcode : TokenCache.GetCachedRefreshToken(Request.Cookies);
                    
                    string accessToken = TokenHelper.GetAccessToken(
                           refreshToken,
                           "00000003-0000-0ff1-ce00-000000000000",
                           sharePointSiteUrl.Authority,
                           TokenHelper.GetRealmFromTargetUrl(sharePointSiteUrl)).AccessToken;

                    using (ClientContext clientContext =
                           TokenHelper.GetClientContextWithAccessToken(sharePointSiteUrl.ToString(),
                                                                       accessToken))
                    {
                        if (clientContext != null)
                        {
                            var list = clientContext.Web.Lists.GetByTitle("TestList");
                            CamlQuery q = new CamlQuery();
                            q.ViewXml = "<View><Query><OrderBy FieldRef='ID' Ascending='False'/></Query></View>";
                            var items = list.GetItems(q);
                            clientContext.Load(items);

                            clientContext.ExecuteQuery();

                            return populateData(items);

                        }
                    }
                }
            }
            catch (ThreadAbortException)
            {
                //do nothing 
            }
            catch (Exception ex)
            {
                coll.Add(new ListDataModel() { ContentType = "", Created = DateTime.MinValue, CreatedBy = "", Modified = DateTime.MinValue, ModifiedBy = "", Title = "No data found :" + ex.Message });
            }
            return coll;
        }

        private ListDataCollection populateData(ListItemCollection items)
        {

            ListDataCollection coll = new ListDataCollection();
            foreach (ListItem itm in items)
            {
                coll.Add(new ListDataModel() { ContentType = itm.ContentType.ToString(), Created = Convert.ToDateTime(itm["Created"]), CreatedBy = itm["Author"].ToString(), Modified = Convert.ToDateTime(itm["Modified"]), ModifiedBy = itm["Editor"].ToString(), Title = itm["Title"].ToString() });
            }
            return coll;
        }
    }
}
