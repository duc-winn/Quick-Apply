using QuickApplyBackend.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace QuickApplyBackend.Database_Context
{
public class QuickApplyContext : DbContext
    {
        public QuickApplyContext(DbContextOptions<QuickApplyContext> options) : base(options)
        {
        }

        public DbSet<AppliedJob> appliedJobs { get; set; }
        public DbSet<Job> jobs { get; set; }
        public DbSet<JobReference> jobReferences { get; set; }
        public DbSet<User> users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<JobReference>()
            .HasMany(j => j.ListOfReferal)
            .WithOne(e => e.JobReference)
            .HasForeignKey(e => e.JobReferenceId);

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AppliedJob>().ToTable("AppliedJobTable");
            modelBuilder.Entity<Job>().ToTable("JobTable");
            modelBuilder.Entity<JobReference>().ToTable("JobReferenceTable");
            modelBuilder.Entity<User>().ToTable("UserTable");
        }
    }
}
