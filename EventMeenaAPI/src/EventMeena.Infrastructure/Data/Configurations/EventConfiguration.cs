using EventMeena.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventMeena.Infrastructure.Data.Configurations;

public class EventConfiguration : IEntityTypeConfiguration<Event>
{
    public void Configure(EntityTypeBuilder<Event> builder)
    {
        builder.ToTable("Events");
        
        builder.HasKey(e => e.Id);
        
        builder.Property(e => e.Title)
            .IsRequired()
            .HasMaxLength(200);
            
        builder.Property(e => e.Description)
            .HasMaxLength(2000);
            
        builder.Property(e => e.CoverImage)
            .HasMaxLength(500);
            
        builder.Property(e => e.ThemeColor)
            .HasMaxLength(20);
            
        builder.Property(e => e.Language)
            .HasMaxLength(10)
            .HasDefaultValue("ar");
            
        builder.Property(e => e.ShareCode)
            .IsRequired()
            .HasMaxLength(20);
            
        builder.HasIndex(e => e.ShareCode)
            .IsUnique();
            
        builder.Property(e => e.ShareLink)
            .HasMaxLength(500);
            
        // Relationship with User
        builder.HasOne(e => e.User)
            .WithMany(u => u.Events)
            .HasForeignKey(e => e.UserId)
            .OnDelete(DeleteBehavior.Cascade);
            
        // Index for faster queries
        builder.HasIndex(e => e.UserId);
        builder.HasIndex(e => e.Status);
        builder.HasIndex(e => e.Type);
    }
}

