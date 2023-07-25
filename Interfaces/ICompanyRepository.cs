using CompanyDetails.Models;

namespace CompanyDetails.Interfaces
{
    public interface ICompanyRepository
    {
        int Create(Company company);
        void Delete(int id);
        Company Get(int id);
        List<Company> GetCompanies();
        bool Update(Company company);
    }
}
