using Abp.Zero.EntityFrameworkCore;
using UserCrud.Authorization.Roles;
using UserCrud.Authorization.Users;
using UserCrud.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace UserCrud.EntityFrameworkCore;

public class UserCrudDbContext : AbpZeroDbContext<Tenant, Role, User, UserCrudDbContext>
{
    /* Define a DbSet for each entity of the application */

    public UserCrudDbContext(DbContextOptions<UserCrudDbContext> options)
        : base(options)
    {
    }
    public DbSet<Assets.Asset> Assets { get; set; }
}
