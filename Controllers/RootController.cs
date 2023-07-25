using Microsoft.AspNetCore.Mvc;
using CompanyDetails.AppCode;
using CompanyDetails.Models;
using CompanyDetails.Interfaces;

namespace CompanyDetails.Controllers
{
    public class RootController : Controller
    {
        #region задание начальных данных и переменных
        readonly ILogRepository repositoryLog;
        readonly ICompanyRepository repositoryCompany;
        readonly IEmployeeRepository repositoryEmployee;
        public RootController(ILogRepository logRepository,
            ICompanyRepository companyRepository,
            IEmployeeRepository employeeRepository)
        {
            ViewBag.L = LayoutViewModel.GetLayoutViewModel();
            repositoryLog = logRepository;
            repositoryCompany = companyRepository;
            repositoryEmployee = employeeRepository;
        }
        public ActionResult Index()
        {
            return View();
        }
        #endregion

        #region обработка таблицы logs
        public ActionResult Log()
        {
            return View(repositoryLog.GetLogs());
        }
        public List<Log> GetLogs()
        {
            return repositoryLog.GetLogs();
        }
        public string CreateLog(Log model)
        {
            return repositoryLog.Create(model) > 0 ? C.TextOk : C.TextErrors;
        }
        public string EditLog(Log model)
        {
            return repositoryLog.Update(model) ? C.TextOk : C.TextErrors;
        }
        public string DeleteLog(int id)
        {
            repositoryLog.Delete(id);
            return C.TextOk;
        }
        #endregion

        #region обработка таблицы companies
        public ActionResult Companies()
        {
            return View(repositoryCompany.GetCompanies());
        }
        public List<Company> GetCompanies()
        {
            return repositoryCompany.GetCompanies();
        }
        public string CreateCompany(Company model)
        {
            return repositoryCompany.Create(model) > 0 ? C.TextOk : C.TextErrors;
        }
        public string EditCompany(Company model)
        {
            return repositoryCompany.Update(model) ? C.TextOk : C.TextErrors;
        }
        public string DeleteCompany(int id)
        {
            repositoryCompany.Delete(id);
            return C.TextOk;
        }
        public Company GetCompany(int id)
        {
            Company company = repositoryCompany.Get(id);
            return company;
        }
        public CompanyDetailsViewModel GetCompanyDetails(int id)
        {
            CompanyDetailsViewModel companyDetailsViewModel = new()
            {
                Company = repositoryCompany.Get(id),
                Employees = repositoryEmployee.GetCompanyEmployees(id)
            };
            return companyDetailsViewModel;
        }
        public Employee GetEmployee(int id)
        {
            Employee employee = repositoryEmployee.Get(id);
            return employee;
        }
        #endregion

    }
}
