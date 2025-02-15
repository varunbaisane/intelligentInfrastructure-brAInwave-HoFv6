import React, { useState } from 'react';
import { Search, Upload, Home, Menu, AlertTriangle } from 'lucide-react';

// Mock data for demonstration
const mockRoads = [
    {
        id: 1,
        name: "Highway 101",
        location: "San Francisco, CA",
        condition: "critical",
        lastInspection: "2024-02-01",
        nextMaintenance: "2024-03-01",
        imageUrl: "/api/placeholder/300/200",
        wearLevel: "High",
        riskFactor: "85%"
    },
    {
        id: 2,
        name: "Bridge Street",
        location: "Portland, OR",
        condition: "good",
        lastInspection: "2024-02-10",
        nextMaintenance: "2024-06-15",
        imageUrl: "/api/placeholder/300/200",
        wearLevel: "Low",
        riskFactor: "15%"
    },
    {
        id: 3,
        name: "Main Avenue",
        location: "Seattle, WA",
        condition: "medium",
        lastInspection: "2024-01-20",
        nextMaintenance: "2024-04-01",
        imageUrl: "/api/placeholder/300/200",
        wearLevel: "Medium",
        riskFactor: "45%"
    }
];

const MainLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState("home");

    const getConditionColor = (condition) => {
        switch (condition) {
            case "good": return "bg-green-500";
            case "medium": return "bg-yellow-500";
            case "critical": return "bg-red-500";
            default: return "bg-gray-500";
        }
    };

    const getCriticalRoads = () => {
        return mockRoads.filter(road => road.condition === "critical");
    };

    const filteredRoads = mockRoads.filter(road =>
        road.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        road.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-[#FFEAC5]">
            {/* Sidebar */}
            <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-[#6C4E31] text-white transition-all duration-300`}>
                <div className="p-4">
                    <button
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-[#603F26] rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                {isSidebarOpen && (
                    <nav className="mt-8">
                        <button
                            onClick={() => setCurrentPage("home")}
                            className={`w-full p-4 text-left hover:bg-[#603F26] ${currentPage === "home" ? 'bg-[#603F26]' : ''}`}
                        >
                            <Home className="inline-block mr-2" size={20} />
                            Home
                        </button>
                        <button
                            onClick={() => setCurrentPage("upload")}
                            className={`w-full p-4 text-left hover:bg-[#603F26] ${currentPage === "upload" ? 'bg-[#603F26]' : ''}`}
                        >
                            <Upload className="inline-block mr-2" size={20} />
                            Upload
                        </button>
                    </nav>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
                <div className="p-8">
                    {currentPage === "home" ? (
                        <div className="flex gap-8">
                            {/* Main Content Area */}
                            <div className="flex-1">
                                {/* Search Bar */}
                                <div className="mb-8 flex justify-center">
                                    <div className="relative w-full max-w-2xl">
                                        <input
                                            type="text"
                                            placeholder="Search roads by name or location..."
                                            className="w-full px-4 py-2 pl-10 rounded-lg border-2 border-[#6C4E31] focus:outline-none focus:border-[#603F26]"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                                    </div>
                                </div>

                                {/* Road Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredRoads.map(road => (
                                        <div key={road.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                            {/* <img
                                                src={road.imageUrl}
                                                alt={road.name}
                                                className="w-full h-48 object-cover"
                                            /> */}
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-xl font-bold text-[#6C4E31]">{road.name}</h3>
                                                    <span className={`${getConditionColor(road.condition)} px-2 py-1 rounded-full text-white text-sm`}>
                                                        {road.condition}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mb-2">{road.location}</p>
                                                <div className="border-t pt-2 mt-2">
                                                    <p className="text-sm text-gray-600">Next Maintenance: {road.nextMaintenance}</p>
                                                    <p className="text-sm text-gray-600">Wear Level: {road.wearLevel}</p>
                                                    <p className="text-sm text-gray-600">Risk Factor: {road.riskFactor}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Critical Roads Sidebar */}
                            <div className="w-80 bg-white rounded-lg shadow-lg p-4 h-fit">
                                <div className="flex items-center gap-2 mb-4">
                                    <AlertTriangle className="text-red-500" />
                                    <h2 className="text-lg font-bold text-[#6C4E31]">Critical Roads</h2>
                                </div>
                                {getCriticalRoads().map(road => (
                                    <div key={road.id} className="mb-4 p-3 bg-red-50 rounded-lg">
                                        <h4 className="font-semibold text-[#6C4E31]">{road.name}</h4>
                                        <p className="text-sm text-gray-600">{road.location}</p>
                                        <p className="text-sm text-red-600">Maintenance: {road.nextMaintenance}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // Upload Page
                        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-[#6C4E31] mb-6">Upload Road Data</h2>
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-[#6C4E31] mb-2">Road Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border-2 border-[#6C4E31] focus:outline-none focus:border-[#603F26]"
                                        placeholder="Enter road name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#6C4E31] mb-2">Location</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border-2 border-[#6C4E31] focus:outline-none focus:border-[#603F26]"
                                        placeholder="Enter location"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#6C4E31] mb-2">Images</label>
                                    <div className="border-2 border-dashed border-[#6C4E31] rounded-lg p-8 text-center">
                                        <Upload className="mx-auto text-[#6C4E31] mb-2" size={32} />
                                        <p className="text-[#6C4E31]">Drag and drop images here or click to upload</p>
                                        <input type="file" className="hidden" multiple accept="image/*" />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#6C4E31] text-white py-2 rounded-lg hover:bg-[#603F26] transition-colors"
                                >
                                    Upload and Analyze
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;