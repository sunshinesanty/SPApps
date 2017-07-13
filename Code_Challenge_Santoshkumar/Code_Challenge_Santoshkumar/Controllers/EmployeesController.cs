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
    public class EmployeesController : ApiController
    {
        #region Private members
        /// <summary>
        /// Variables used to generate a unique ID for Logs
        /// </summary>
        private string _correlationId = Guid.NewGuid().ToString();
        private static readonly log4net.ILog Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        #endregion

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

        #region Members
        /// <summary>
        /// Private members used for teh controllers to hold repositories
        /// </summary>
        private EmployeesRepository EmployeeRepo { get; } = new EmployeesRepository();
        #endregion

        #region Controller Action Methods
        /// <summary>
        /// Reads the list of Employees as and Organization Chart
        /// </summary>
        /// <returns>Array of employees aarranged as per their Org chart</returns>
        [HttpGet]
        [ActionName("GetEmployeesByHeirarchy")]
        public HttpResponseMessage GetEmployeesByHeirarchy()
        {
            try
            {
                Log.Info("initialiing get Employee data");

                var httpResponseMessage = new HttpResponseMessage()
                {
                    Content = new ObjectContent<IList<OrgChartHeirarchy>>(EmployeeRepo.GetEmployeesByHierarchy(),
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
        [ActionName("GetEmployeeDetails")]
        public HttpResponseMessage GetEmployeeDetails(int? id)
        {
            try
            {
                Log.Info("initialiing get Employee by Id");
                if (!id.HasValue) {
                    throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
                }
                //Return a single employee detail  
                var EmployeeObject = EmployeeRepo.GetEmployeeDetails(id.Value);
                if (EmployeeObject == null)
                {
                    throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
                }

                var httpResponseMessage = new HttpResponseMessage()
                {
                    Content = new ObjectContent<OrgChartHeirarchy>(EmployeeObject,
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

        /// <summary>
        /// Adds a new Employee to the Existing list
        /// </summary>
        /// <param name="EmployeeDataToAdd"></param>
        /// <returns></returns>
        [HttpPost]
        [ActionName("AddEmployees")]
        public HttpResponseMessage AddEmployees([FromBody] Employee EmployeeDataToAdd)
        {
            try
            {
                Log.Info("initializing add employee");
                //Return a single employee detail  
                if (!ModelState.IsValid)
                {
                    throw new ArgumentException("All required fields are not provided.");
                }

                var httpResponseMessage = new HttpResponseMessage()
                {
                    Content = new ObjectContent<IList<OrgChartHeirarchy>>(EmployeeRepo.AddEmployees(EmployeeDataToAdd),
                    Configuration.Formatters.JsonFormatter),
                    StatusCode = HttpStatusCode.OK,
                };
                return httpResponseMessage;
            }
            catch (ArgumentException hex)
            {
                var errorMessage = Helper.HttpResponseErrorMessage(hex.Message, _correlationId);
                Log.Error("Exception occurred in Add Employee Method", hex);
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, errorMessage));
            }
            catch (Exception ex)
            {
                var errorMessage = Helper.HttpResponseErrorMessage(ex.Message, _correlationId);
                Log.Error("Exception occurred in Add Employee Method", ex);
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, errorMessage));
            }
        }

        /// <summary>
        /// Updates the details of an existing Employee.
        /// </summary>
        /// <param name="EmployeeDataToUpdate"></param>
        /// <returns>Updated Org Chart is returned back</returns>
        [HttpPut]
        [ActionName("UpdateEmployees")]
        public HttpResponseMessage UpdateEmployees([FromBody] Employee EmployeeDataToUpdate)
        {
            try
            {
                Log.Info("initialiing update employee");
                //Return a single employee detail  
                if (!ModelState.IsValid)
                {
                    throw new ArgumentException("All required Fields are not provided, First and and last name should be included, from original object.");
                }

                var httpResponseMessage = new HttpResponseMessage()
                {
                    Content = new ObjectContent<IList<OrgChartHeirarchy>>(EmployeeRepo.UpdateEmployee(EmployeeDataToUpdate),
                    Configuration.Formatters.JsonFormatter),
                    StatusCode = HttpStatusCode.OK,
                };
                return httpResponseMessage;
            }
            catch (ArgumentException hex)
            {
                var errorMessage = Helper.HttpResponseErrorMessage(hex.Message, _correlationId);
                Log.Error("Exception occurred in Update employee method", hex);
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, errorMessage));
            }
            catch (Exception ex)
            {
                var errorMessage = Helper.HttpResponseErrorMessage(ex.Message, _correlationId);
                Log.Error("Exception occurred in Update Employee method", ex);
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, errorMessage));
            }
        }

        /// <summary>
        /// Deletes a Employee based on ID
        /// </summary>
        /// <param name="EmployeeIDToDelete"></param>
        /// <param name="NewManagerIDForReportees"></param>
        /// <returns>Updated Org Chart is returnd back</returns>
        [HttpDelete]
        [ActionName("DeleteEmployee")]
        public HttpResponseMessage DeleteEmployee([FromBody] EmployeeDeleteRequest deleteRequest)
        {
            try
            {
                Log.Info("initializing delete employee");
                //Return a single employee detail  
                if (!ModelState.IsValid)
                {
                    throw new ArgumentException("Employee ID to Delete is not found.");
                }

                var httpResponseMessage = new HttpResponseMessage()
                {
                    Content = new ObjectContent<IList<OrgChartHeirarchy>>(EmployeeRepo.DeleteEmployee(deleteRequest.Id, deleteRequest.AlertnativeManagerId),
                    Configuration.Formatters.JsonFormatter),
                    StatusCode = HttpStatusCode.OK,
                };
                return httpResponseMessage;
            }
            catch (ArgumentException hex)
            {
                var errorMessage = Helper.HttpResponseErrorMessage(hex.Message, _correlationId);
                Log.Error("Exception occurred in delete employee method", hex);
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, errorMessage));
            }
            catch (InvalidOperationException ex)
            {
                var errorMessage = Helper.HttpResponseErrorMessage(ex.Message, _correlationId);
                Log.Error("Exception occurred in delete employee method", ex);
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.ExpectationFailed, errorMessage));
            }
            catch (Exception ex)
            {
                var errorMessage = Helper.HttpResponseErrorMessage(ex.Message, _correlationId);
                Log.Error("Exception occurred in delete employee method", ex);
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, errorMessage));
            }
        }
        #endregion
    }
}
