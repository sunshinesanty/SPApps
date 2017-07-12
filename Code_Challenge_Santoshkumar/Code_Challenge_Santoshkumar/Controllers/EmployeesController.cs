using Code_Challenge_Santoshkumar.Common;
using Code_Challenge_Santoshkumar.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace Code_Challenge_Santoshkumar.Controllers
{

    [Route("api/employees")]
    public class EmployeesController : ApiController
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

        #region Memnbers
        private EmployeesRepository EmployeeRepo { get; } = new EmployeesRepository();
        #endregion

        /// <summary>
        /// Reads the list of Employees
        /// </summary>
        /// <returns>Returns the sorted Order of Employees</returns>
        [HttpGet]
        public HttpResponseMessage GetEmployeesByHeirarchy()
        {
            try
            {
                Log.Info("initialiing get Employee data");

                var httpResponseMessage = new HttpResponseMessage()
                {
                    Content = new ObjectContent<IList<Employee>>(EmployeeRepo.GetEmployeesByHeirarchy(),
                    Configuration.Formatters.JsonFormatter),
                    StatusCode = HttpStatusCode.OK,
                };
                return httpResponseMessage;
            }
            catch (Exception ex)
            {
                var errorMessage = Helper.HttpResponseErrorMessage(ex.Message, _correlationId);
                Log.Error("Exception occurred in PostFeed", ex);
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, errorMessage));
            }
        }

        /// <summary>
        /// Get Employee By ID
        /// </summary>
        /// <param name="id">Employee ID to retrieve</param>
        /// <returns>returns specific employee or throws not found exception</returns>
        [HttpGet]
        public HttpResponseMessage GetEmployeeDetails(int id)
        {
            try
            {
                Log.Info("initialiing get Employee by Id");
                //Return a single employee detail  
                var EmployeeObject = EmployeeRepo.GetEmployeeDetails(id);
                if (EmployeeObject == null)
                {
                    throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
                }

                var httpResponseMessage = new HttpResponseMessage()
                {
                    Content = new ObjectContent<Employee>(EmployeeObject,
                    Configuration.Formatters.JsonFormatter),
                    StatusCode = HttpStatusCode.OK,
                };
                return httpResponseMessage;
            }
            catch (HttpResponseException hex)
            {
                var errorMessage = Helper.HttpResponseErrorMessage(hex.Message, _correlationId);
                Log.Error("Exception occurred in PostFeed", hex);
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.NotFound, errorMessage));
            }
            catch (Exception ex)
            {
                var errorMessage = Helper.HttpResponseErrorMessage(ex.Message, _correlationId);
                Log.Error("Exception occurred in PostFeed", ex);
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, errorMessage));
            }
        }

        [HttpPost]
        public HttpResponseMessage AddEmployees(Employee EmployeeDataToAdd) {
            try
            {
                Log.Info("initialiing add employee");
                //Return a single employee detail  
                if (!ModelState.IsValid)
                {
                    throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.BadRequest));
                }

                var httpResponseMessage = new HttpResponseMessage()
                {
                    Content = new ObjectContent<IList<Employee>>(EmployeeRepo.AddEmployees(EmployeeDataToAdd),
                    Configuration.Formatters.JsonFormatter),
                    StatusCode = HttpStatusCode.OK,
                };
                return httpResponseMessage;
            }
            catch (HttpResponseException hex)
            {
                var errorMessage = Helper.HttpResponseErrorMessage(hex.Message, _correlationId);
                Log.Error("Exception occurred in PostFeed", hex);
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, errorMessage));
            }
            catch (Exception ex)
            {
                var errorMessage = Helper.HttpResponseErrorMessage(ex.Message, _correlationId);
                Log.Error("Exception occurred in PostFeed", ex);
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, errorMessage));
            }
        }

        [HttpPut]
        public HttpResponseMessage UpdateEmployeesByHeirarchy(Employee EmployeeDataToUpdate)
        {
            try
            {
                Log.Info("initialiing add employee");
                //Return a single employee detail  
                if (!ModelState.IsValid)
                {
                    throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.BadRequest));
                }

                var httpResponseMessage = new HttpResponseMessage()
                {
                    Content = new ObjectContent<IList<Employee>>(EmployeeRepo.UpdateEmployee(EmployeeDataToUpdate),
                    Configuration.Formatters.JsonFormatter),
                    StatusCode = HttpStatusCode.OK,
                };
                return httpResponseMessage;
            }
            catch (HttpResponseException hex)
            {
                var errorMessage = Helper.HttpResponseErrorMessage(hex.Message, _correlationId);
                Log.Error("Exception occurred in PostFeed", hex);
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, errorMessage));
            }
            catch (Exception ex)
            {
                var errorMessage = Helper.HttpResponseErrorMessage(ex.Message, _correlationId);
                Log.Error("Exception occurred in PostFeed", ex);
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, errorMessage));
            }
        }
    }
}
