using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CompanyDetails.Models
{
    [Table("companies", Schema = "dbo")]
    public class Company
    {
        [Key, Column("id")]
        public int ID { get; set; }

        [Column("companyname")]
        public required string CompanyName { get; set; }

        [Column("city")]
        public required string City { get; set; }

        [Column("address")]
        public required string Address { get; set; }

        [Column("state")]
        public required string State { get; set; }

        [Column("phone")]
        public required string Phone { get; set; }

        public required ICollection<Employee> Employees { get; set; }
    }
}

/*
 public required string => общедоступная обязательная строка

https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/required

 
 */