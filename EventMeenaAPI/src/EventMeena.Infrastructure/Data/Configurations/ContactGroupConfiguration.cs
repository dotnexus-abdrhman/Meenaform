using EventMeena.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventMeena.Infrastructure.Data.Configurations;

public class ContactGroupConfiguration : IEntityTypeConfiguration<ContactGroup>
{
    public void Configure(EntityTypeBuilder<ContactGroup> builder)
    {
        builder.ToTable("ContactGroups");
        
        // Composite Primary Key
        builder.HasKey(cg => new { cg.ContactId, cg.GroupId });
        
        // Relationship with Contact
        builder.HasOne(cg => cg.Contact)
            .WithMany(c => c.ContactGroups)
            .HasForeignKey(cg => cg.ContactId)
            .OnDelete(DeleteBehavior.Cascade);
            
        // Relationship with Group
        builder.HasOne(cg => cg.Group)
            .WithMany(g => g.ContactGroups)
            .HasForeignKey(cg => cg.GroupId)
            .OnDelete(DeleteBehavior.NoAction); // Prevent cascade delete conflict
            
        builder.HasIndex(cg => cg.ContactId);
        builder.HasIndex(cg => cg.GroupId);
    }
}

