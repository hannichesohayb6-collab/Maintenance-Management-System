<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SpecializationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Plumbing', 'Electrical', 'HVAC', 'Carpentry', 'Painting', 'Masonry', 'Roofing', 'Cleaning', 'Locksmithing', 'Appliance Repair',
            'Gardening', 'Landscaping', 'Pest Control', 'Drywall', 'Flooring', 'Tiling', 'Glass Work', 'Metal Work', 'Welding', 'Insulation',
            'Ventilation', 'Security Systems', 'Smart Home', 'Firefighting', 'Solar Energy', 'Wind Energy', 'Water Treatment', 'Waste Management', 'Drainage', 'Excavation',
            'Concrete', 'Asphalt', 'Fencing', 'Decking', 'Cabinetry', 'Furniture Repair', 'Upholstery', 'Window Installation', 'Door Repair', 'Siding',
            'Brickwork', 'Stucco', 'Plastering', 'Waterproofing', 'Foundation Repair', 'Basement Finishing', 'Attic Insulation', 'Gutter Cleaning', 'Pressure Washing', 'Exterior Painting',
            'Interior Painting', 'Wallpapering', 'Trim Work', 'Molding', 'Hardwood Flooring', 'Laminate Flooring', 'Vinyl Flooring', 'Carpet Installation', 'Tile Setting', 'Grouting',
            'Faucet Repair', 'Toilet Installation', 'Shower Repair', 'Water Heater Service', 'Sump Pump Installation', 'Pipe Leak Repair', 'Sewer Line Cleaning', 'Water Filter System', 'Gas Line Repair', 'Radiator Service',
            'Light Switch Replacement', 'Outlet Installation', 'Panel Upgrade', 'Circuit Breaker Repair', 'Ceiling Fan Installation', 'Lighting Design', 'Generator Installation', 'EV Charger Setup', 'Low Voltage Wiring', 'Internet Cabling',
            'AC Charging', 'Thermostat Installation', 'Duct Cleaning', 'Furnace Repair', 'Heat Pump Service', 'Ventilation Setup', 'Refrigeration', 'Air Purifier Installation', 'Radiant Heating', 'AC Unit Maintenance',
            'Door Frame Repair', 'Hinge Replacement', 'Lock Installation', 'Cabinet Hardware', 'Shelving Installation', 'Custom Woodwork', 'Wood Sanding', 'Varnishing', 'Staircase Repair', 'Deck Staining',
            'Wall Patching', 'Texture Application', 'Corner Bead Installation', 'Joint Compound', 'Sanding', 'Priming', 'Accent Walls', 'Ceiling Repair', 'Soundproofing', 'Fire-rated Drywall',
            'Paver Installation', 'Retaining Walls', 'Stone Masonry', 'Concrete Pouring', 'Stucco Finishing', 'Chimney Repair', 'Fireplace Installation', 'Bricklaying', 'Grouting', 'Pointing',
            'Shingle Replacement', 'Metal Roofing', 'Flat Roof Repair', 'Gutter Installation', 'Skylight Installation', 'Roof Venting', 'Flashing Repair', 'Tarring', 'Soffit Repair', 'Fascia Board Replacement',
            'Deep Cleaning', 'Window Cleaning', 'Carpet Cleaning', 'Floor Polishing', 'Upholstery Cleaning', 'Mold Remediation', 'Odour Removal', 'Post-Construction Cleaning', 'Move-in Cleaning', 'Commercial Cleaning',
            'Key Duplication', 'Smart Lock Installation', 'Master Lock Setup', 'Safe Opening', 'Intercom Repair', 'Electronic Keypads', 'Door Closer Adjustment', 'Strike Plate Alignment', 'Panic Bar Installation', 'Exit Device Repair',
            'Dishwasher Repair', 'Refrigerator Service', 'Oven Calibration', 'Microwave Repair', 'Washing Machine Service', 'Dryer Vent Cleaning', 'Freezer Repair', 'Stove Top Fix', 'Wine Cooler Service', 'Coffee Machine Repair',
            'Lawn Mowing', 'Hedge Trimming', 'Tree Pruning', 'Sod Installation', 'Irrigation Setup', 'Fertilization', 'Weed Control', 'Aeration', 'Mulching', 'Garden Design',
            'Fence Repair', 'Gate Installation', 'Vinyl Fencing', 'Chain Link Setup', 'Wrought Iron Work', 'Post Hole Digging', 'Privacy Screening', 'Deck Railing', 'Pergola Construction', 'Arbor Installation',
            'Window Caulking', 'Screen Replacement', 'Glass Cutting', 'Mirror Installation', 'Storm Window Setup', 'Double Glazing', 'Sill Repair', 'Frame Painting', 'Hinge Lubrication', 'Lock Adjustment',
            'Siding Repair', 'Vinyl Siding', 'Aluminum Siding', 'Cedar Shingles', 'Stucco Patching', 'Exterior Trim', 'Soffit Venting', 'Fascia Painting', 'Exterior Caulking', 'Siding Cleaning',
        ];

        foreach ($categories as $name) {
            \App\Models\Specialization::firstOrCreate(['name' => $name]);
        }
    }

}
