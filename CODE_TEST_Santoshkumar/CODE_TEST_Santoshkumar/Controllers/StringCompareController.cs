using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using CODE_TEST_Santoshkumar.Models;
using CODE_TEST_Santoshkumar.Common;

namespace CODE_TEST_Santoshkumar.Controllers
{
    public class StringCompareController : ApiController
    {
        private string _correlationId = Guid.NewGuid().ToString();
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        #region Logging Context Initialize/Dispose
        public IDisposable LoggingContext { get; set; }
        protected override void Initialize(HttpControllerContext controllerContext)
        {
            LoggingContext = log4net.LogicalThreadContext.Stacks["NDC"].Push(_correlationId);
            base.Initialize(controllerContext);
        }

        protected override void Dispose(bool disposing)
        {
            if (LoggingContext != null) LoggingContext.Dispose();
            base.Dispose(disposing);
        }
        #endregion

        [HttpPost]
        [Route("api/StringCompare/CompareString")]
        public HttpResponseMessage CompareString([FromBody] CompareRequest request)
        {
            try
            {
                Log.Info("initialiing compare");

                var httpResponseMessage = new HttpResponseMessage()
                {
                    Content = new ObjectContent<int[]>(StringCompare.Compare(request.SourceString, request.SubString).ToArray(),
                    Configuration.Formatters.JsonFormatter),
                    StatusCode = HttpStatusCode.OK,
                };
                return httpResponseMessage;
            }
            catch (Exception ex)
            {
                var errorMessage = Helper.HttpResponseErrorMessage(ex.Message, _correlationId);
                Log.Error(string.Format("{0} - {1}", _correlationId, "Exception occurred: Unable to determine traingle type"), ex);
                throw new HttpResponseException(
                    Request.CreateErrorResponse(HttpStatusCode.InternalServerError, errorMessage));
            }
        }
    }
}
