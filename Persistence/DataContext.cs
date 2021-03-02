using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
  public class DataContext : DbContext
  {
    public DbSet<Group> Groups { get; set; }

    public DataContext(DbContextOptions options) : base(options) { }
  }
}