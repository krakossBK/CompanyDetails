using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace CompanyDetails.Models
{
    [Table("logs", Schema = "dbo")]
    public class Log
    {
        [Key, Column("id")]
        public int ID { get; set; }

        [Column("time")]
        public DateTime Time { get; set; }
        [Column("message")]
        public required string Message { get; set; }

        //public Log(DateTime time, string message)
        //{
        //    Time = time;
        //    Message = message;
        //}
    }
}
