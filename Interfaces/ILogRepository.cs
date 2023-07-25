using CompanyDetails.Models;

namespace CompanyDetails.Interfaces
{
    public interface ILogRepository
    {
        int Create(Log log);
        void Delete(int id);
        Log Get(int id);
        List<Log> GetLogs();
        bool Update(Log log);
    }
}
