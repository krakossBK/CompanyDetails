using Microsoft.EntityFrameworkCore;
using System;

namespace CompanyDetails.Models
{
    public class CompanyContext : DbContext
    {
        public CompanyContext(DbContextOptions<CompanyContext> options)
            : base(options)
        {
        }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Log> Logs { get; set; }
        public virtual DbSet<Employee> Employees { get; set; }
        
    }
}
