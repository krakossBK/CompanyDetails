using CompanyDetails.Models;

namespace CompanyDetails.Interfaces
{
    public interface IEmployeeRepository
    {
        int Create(Employee employee);
        void Delete(int id);
        Employee Get(int id);
        List<Employee> GetEmployees(); 
        List<Employee> GetCompanyEmployees(int companyId);
        bool Update(Employee employee);
    }
}
