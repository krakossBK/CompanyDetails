using CompanyDetails.Interfaces;
using CompanyDetails.Models;
using Microsoft.EntityFrameworkCore;

namespace CompanyDetails.Repositories
{
       public class EmployeeRepository : IEmployeeRepository
    {
        private readonly CompanyContext _companyContext;

        public EmployeeRepository(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }
        public List<Employee> GetEmployees()
        {
            DbSet<Employee> Employees = _companyContext.Employees;
            return Employees.ToList();
        }
        public List<Employee> GetCompanyEmployees(int companyId)
        {
            DbSet<Employee> Employees = _companyContext.Employees;
            return Employees.Where(e => e.CompanyId == companyId).ToList();
        }
        public Employee Get(int id)
        {
            var employees = _companyContext.Employees.Find(id);
            return employees ?? throw new KeyNotFoundException("Employee Not Found");
        }

        public int Create(Employee model)
        {
            var employeeExist = _companyContext.Employees.Any(e => e.Id == model.Id);
            if (employeeExist == true)
                return 0;

            _companyContext.Add(model);
            _companyContext.SaveChanges();
            return 1;
        }

        public bool Update(Employee model)
        {
           
                _companyContext.Update(model);
                _companyContext.SaveChanges(true);
                return true;
        }

        public void Delete(int id)
        {
            var Employee = Get(id);
            _companyContext.Employees.Remove(Employee);
            _companyContext.SaveChanges();
        }
    }

}
