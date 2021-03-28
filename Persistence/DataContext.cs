using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
  public class DataContext : IdentityDbContext<User>
  {
    public DbSet<Group> Groups { get; set; }
    public DbSet<GroupStudent> GroupStudents { get; set; }

    public DataContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      builder.Entity<GroupStudent>(g => g.HasKey(s => new { s.GroupId, s.StudentId }));
      builder.Entity<GroupStudent>()
        .HasOne(s => s.Group)
        .WithMany(g => g.Students)
        .OnDelete(DeleteBehavior.Cascade);
    }
  }
}