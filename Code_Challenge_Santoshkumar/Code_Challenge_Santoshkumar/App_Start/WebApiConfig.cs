using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Code_Challenge_Santoshkumar
{
    public static class WebApiConfig
    {
        public static string GetAllowedOrigins()
        {
            System.Collections.Generic.List<string> allowedOrgs = new System.Collections.Generic.List<string>();
            allowedOrgs.Add(System.Configuration.ConfigurationManager.AppSettings.Get("AllowedOrigins"));
            return string.Join(",", allowedOrgs.Where(org => !string.IsNullOrEmpty(org)).ToArray());
        }
        public static void Register(HttpConfiguration config)
        {
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            string allowedOrgs = WebApiConfig.GetAllowedOrigins();
            if (!string.IsNullOrWhiteSpace(allowedOrgs))
            {
                var cors = new EnableCorsAttribute(
                   allowedOrgs, "*", "POST,GET,PUT,PATCH,DELETE");
                cors.ExposedHeaders.Add("Content");
                cors.ExposedHeaders.Add("Origin");
                config.EnableCors(cors);
            }

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
