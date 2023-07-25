using CompanyDetails.Interfaces;
using CompanyDetails.Models;
using Microsoft.EntityFrameworkCore;

namespace CompanyDetails.Repositories
{
       public class CompanyRepository : ICompanyRepository
    {
        private readonly CompanyContext _companyContext;

        public CompanyRepository(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }
        public List<Company> GetCompanies()
        {
            DbSet<Company> companies = _companyContext.Companies;
            return companies.AsEnumerable().OrderBy(c=>c.ID).ToList();
        }

        public Company Get(int id)
        {
            var company = _companyContext.Companies.Find(id);
            return company ?? throw new KeyNotFoundException("Company Not Found");
        }

        public int Create(Company model)
        {
            var companyExist = _companyContext.Companies.Any(e => e.CompanyName == model.CompanyName);
            if (companyExist == true)
                return 0;
            _companyContext.Add(model);
            _companyContext.SaveChanges();
            return 1;
        }

        public bool Update(Company model)
        {
            if (!string.IsNullOrEmpty(model.CompanyName) && !string.IsNullOrEmpty(model.Address))
            {               
                _companyContext.Update(model);
                _companyContext.SaveChanges(true);
                return true;
            }
            else
                return false;
        }

        public void Delete(int id)
        {
            var company = Get(id);
            _companyContext.Companies.Remove(company);
            _companyContext.SaveChanges();
        }
    }

}
