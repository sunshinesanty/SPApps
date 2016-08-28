using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ReactWithSPHostedAppWeb.Controllers
{
    public class HomeController : Controller
    {
        [SharePointContextFilter]
        public ActionResult Index()
        {
            ViewBag.UserName = "User Name";
            return View();
        }

        [SharePointContextFilter]
        public ActionResult SPLanding()
        {
            ViewBag.Message = "Landing from SP";
            
            return View();
        }
    }
}
