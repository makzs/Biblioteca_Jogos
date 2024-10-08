﻿// <auto-generated />
using System;
using Biblioteca_Jogos.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Biblioteca_Jogos.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Biblioteca_Jogos.Models.Genero", b =>
                {
                    b.Property<int>("GeneroId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("GeneroId"));

                    b.Property<string>("Descricao")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImagemUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("GeneroId");

                    b.ToTable("Generos");
                });

            modelBuilder.Entity("Biblioteca_Jogos.Models.Jogo", b =>
                {
                    b.Property<int>("JogoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("JogoId"));

                    b.Property<int>("Ano")
                        .HasColumnType("int");

                    b.Property<DateTime>("DataCadastrado")
                        .HasColumnType("datetime2");

                    b.Property<int>("GeneroId")
                        .HasColumnType("int");

                    b.Property<string>("ImagemUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Plataformas")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Preco")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("JogoId");

                    b.HasIndex("GeneroId");

                    b.ToTable("Jogos");
                });

            modelBuilder.Entity("Biblioteca_Jogos.Models.Jogo", b =>
                {
                    b.HasOne("Biblioteca_Jogos.Models.Genero", "Genero")
                        .WithMany("Jogos")
                        .HasForeignKey("GeneroId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Genero");
                });

            modelBuilder.Entity("Biblioteca_Jogos.Models.Genero", b =>
                {
                    b.Navigation("Jogos");
                });
#pragma warning restore 612, 618
        }
    }
}
