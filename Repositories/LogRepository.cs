using CompanyDetails.Interfaces;
using CompanyDetails.Models;
using Microsoft.EntityFrameworkCore;

namespace CompanyDetails.Repositories
{
       public class LogRepository : ILogRepository
    {
        private readonly CompanyContext _companyContext;

        public LogRepository(CompanyContext companyContext)
        {
            _companyContext = companyContext;
        }
        public List<Log> GetLogs()
        {
            DbSet<Log> logs = _companyContext.Logs;
            return logs.ToList();
        }

        public Log Get(int id)
        {
            var logs = _companyContext.Logs.Find(id);
            return logs ?? throw new KeyNotFoundException("Log Not Found");
        }

        public int Create(Log model)
        {
            var logExist = _companyContext.Logs.Any(e => e.ID == model.ID);
            if (logExist == true)
                return 0;

            model.Time = DateTime.UtcNow;
            _companyContext.Add(model);
            _companyContext.SaveChanges();
            return 1;
        }

        public bool Update(Log model)
        {
            if (!string.IsNullOrEmpty(model.Message) && !string.IsNullOrEmpty(Convert.ToString(model.Time)))
            {

                model.Time = DateTime.UtcNow;
                _companyContext.Update(model);
                _companyContext.SaveChanges(true);
                return true;
            }
            else
                return false;
        }

        public void Delete(int id)
        {
            var log = Get(id);
            _companyContext.Logs.Remove(log);
            _companyContext.SaveChanges();
        }
    }

}
