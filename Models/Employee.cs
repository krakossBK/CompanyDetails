using CompanyDetails.AppCode;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CompanyDetails.Models
{
    [Table("employees", Schema = "dbo")]
    public class Employee
    {
        [Key, Column("id")]
        public int Id { get; set; }

        [Column("firstname")]
        public required string FirstName { get; set; }

        [Column("lastname")]
        public required string LastName { get; set; }

        [Column("titleemployee")]
        public TitleEmp TitleEmployee { get; set; }

        [Column("birthdate")]
        public DateTime BirthDate { get; set; }

        [Column("positionemployee")]
        public PositionEmp PositionEmployee { get; set; }

        [Column("companyid")]
        public int CompanyId { get; set; }

        /* ✅   ************* вычисляемые поля *************   ✅*/

        public  string BirthDateString => BirthDate.ToString("M/dd/yyyy").Replace(".", "/");
        public  string TitleEmployeeString => EnumHelper.EnumToString(TitleEmployee);
        public  string PositionEmployeeString => EnumHelper.EnumToString(PositionEmployee);
    }
}
