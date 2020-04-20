
using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace CarpoolReact.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }

        public ApplicationUser()
        {

        }

    }
}
