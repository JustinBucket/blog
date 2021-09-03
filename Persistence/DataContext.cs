using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) { }

        public DbSet<Post> Posts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder
                .Entity<Post>()
                .Property(e => e.Paragraphs)
                .HasConversion(
                    v => string.Join("|", v),
                    v => v.Split('|', StringSplitOptions.RemoveEmptyEntries));

        }
    }
}