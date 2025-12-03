using EventMeena.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventMeena.Infrastructure.Data.Configurations;

public class SectionConfiguration : IEntityTypeConfiguration<Section>
{
    public void Configure(EntityTypeBuilder<Section> builder)
    {
        builder.ToTable("Sections");
        
        builder.HasKey(s => s.Id);
        
        builder.Property(s => s.Title)
            .IsRequired()
            .HasMaxLength(200);
            
        builder.Property(s => s.Description)
            .HasMaxLength(1000);
            
        // Relationship with Event
        builder.HasOne(s => s.Event)
            .WithMany(e => e.Sections)
            .HasForeignKey(s => s.EventId)
            .OnDelete(DeleteBehavior.Cascade);
            
        builder.HasIndex(s => s.EventId);
    }
}

