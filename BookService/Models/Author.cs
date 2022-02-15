//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Web;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookService.Models
{
    public class Author
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        // not used in this sample to nake a relationship to Book 
        //public ICollection<Book> Books { get; set; }
    }
}