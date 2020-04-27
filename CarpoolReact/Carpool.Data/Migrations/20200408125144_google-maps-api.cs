using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.Migrations
{
    public partial class googlemapsapi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ViaPoint");

            migrationBuilder.DropColumn(
                name: "EstimatedTime",
                table: "Route");

            migrationBuilder.DropColumn(
                name: "DepartureTime",
                table: "Rides");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "Rides",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Time",
                table: "Rides",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Location",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Latitude = table.Column<decimal>(type: "decimal(5, 2)", nullable: false),
                    Longitude = table.Column<decimal>(type: "decimal(5, 2)", nullable: false),
                    Type = table.Column<int>(nullable: false),
                    RouteId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Location", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Location_Route_RouteId",
                        column: x => x.RouteId,
                        principalTable: "Route",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Location_RouteId",
                table: "Location",
                column: "RouteId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Location");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "Rides");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "Rides");

            migrationBuilder.AddColumn<int>(
                name: "EstimatedTime",
                table: "Route",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DepartureTime",
                table: "Rides",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "ViaPoint",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Destination = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Distance = table.Column<float>(type: "real", nullable: false),
                    RouteId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Source = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ViaPoint", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ViaPoint_Route_RouteId",
                        column: x => x.RouteId,
                        principalTable: "Route",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ViaPoint_RouteId",
                table: "ViaPoint",
                column: "RouteId");
        }
    }
}
