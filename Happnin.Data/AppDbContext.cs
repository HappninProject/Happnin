using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore.ChangeTracking;


namespace Happnin.Data
{
    public class AppDbContext : ApiAuthorizationDbContext<User>
    {
        public DbSet<Event> Events { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Category> Categories { get; set; }

        public DbSet<Attending> Attendees { get; set; }

        public DbSet<Friendship> Friends { get; set; }

        public DbSet<EventImage> EventImages { get; set; }

        public AppDbContext(DbContextOptions dbContext,  
            IOptions<OperationalStoreOptions> operationalStoreOptions): base(dbContext, operationalStoreOptions) { }
        
    }

}
