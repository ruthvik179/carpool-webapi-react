using Carpool.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Carpool.Data
{
    public class CarpoolContext : IdentityDbContext<ApplicationUser>
    {
        public CarpoolContext(DbContextOptions<CarpoolContext> options) : base(options)
        {

        }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Rider> Riders { get; set; }
        public DbSet<Ride>Rides { get; set; }
        public DbSet<Bill> Bills { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<RideRequest> RideRequests { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Promotion> Promotions { get; set; }

    }
}
