using Microsoft.EntityFrameworkCore.Migrations;

namespace Carpool.Migrations
{
    public partial class appdiscountadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discount",
                table: "Bills");

            migrationBuilder.AddColumn<double>(
                name: "AppDiscount",
                table: "Bills",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "DriverDiscount",
                table: "Bills",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AppDiscount",
                table: "Bills");

            migrationBuilder.DropColumn(
                name: "DriverDiscount",
                table: "Bills");

            migrationBuilder.AddColumn<double>(
                name: "Discount",
                table: "Bills",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
