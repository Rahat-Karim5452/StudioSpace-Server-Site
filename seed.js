// Adds 6 demo studios to MongoDB. Run it once with: npm run seed
import "dotenv/config";
import { MongoClient } from "mongodb";

const image = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200`;

// Register this email on the website to manage the demo studios
const owner = {
  ownerName: "Ava Bennett",
  ownerEmail: "ava@studiospace.dev",
  ownerPhoto: "",
};

const reviews = [
  {
    name: "Marcus Oduya",
    rating: 5,
    comment: "Spotless room and the host had everything ready when we arrived.",
  },
  {
    name: "Priya Raman",
    rating: 5,
    comment: "Easy to load in and exactly as described. We will book again.",
  },
];

const studios = [
  {
    title: "Northlight Cyc Studio",
    category: "Photo Studio",
    hourlyRate: 85,
    securityDeposit: 200,
    maxCapacity: 12,
    location: "Greenpoint, Brooklyn",
    imageUrl: image(17094501),
    gallery: [image(20313879), image(7205296)],
    amenities: ["Cyc wall", "Strobe lighting", "Blackout", "Makeup room", "Wi-Fi"],
    overview:
      "A 1,400 sq ft daylight studio built around a 14ft infinity cove that is repainted every week. Strobe kits, C-stands and a full set of apple boxes are included with every booking.",
    rating: 4.9,
  },
  {
    title: "Helios Sound Stage",
    category: "Film Stage",
    hourlyRate: 240,
    securityDeposit: 500,
    maxCapacity: 40,
    location: "Arts District, Los Angeles",
    imageUrl: image(8089249),
    gallery: [image(7865064), image(7513427)],
    amenities: ["Drive-in access", "Green screen", "Lighting grid", "Makeup room", "Parking"],
    overview:
      "A 4,200 sq ft sound stage with a 22ft lighting grid, a cyclorama and drive-in access for a 5-tonne truck. A production office and a green room are attached.",
    rating: 4.9,
  },
  {
    title: "The Long Take Podcast Lounge",
    category: "Podcast Lounge",
    hourlyRate: 48,
    securityDeposit: 80,
    maxCapacity: 5,
    location: "East Austin, Texas",
    imageUrl: image(7383469),
    gallery: [image(32007691), image(7598553)],
    amenities: ["Broadcast mics", "Acoustic treatment", "Live streaming", "Wi-Fi"],
    overview:
      "A treated podcast lounge with four broadcast microphones and a mixing desk that is ready to record. Multi-camera video capture is available on request.",
    rating: 4.8,
  },
  {
    title: "Halcyon Console Room",
    category: "Music Suite",
    hourlyRate: 120,
    securityDeposit: 300,
    maxCapacity: 8,
    location: "Wicker Park, Chicago",
    imageUrl: image(8197361),
    gallery: [image(36936571), image(744323)],
    amenities: ["Full backline", "Recording engineer", "Iso booth", "Wi-Fi"],
    overview:
      "A 32-channel console room with a tuned live floor, a two-person iso booth and house instruments. A recording engineer can be added to any session.",
    rating: 4.8,
  },
  {
    title: "Kiln & Canvas Workshop",
    category: "Workshop",
    hourlyRate: 42,
    securityDeposit: 60,
    maxCapacity: 14,
    location: "Kreuzberg, Berlin",
    imageUrl: image(4348298),
    gallery: [image(36764941), image(9283867)],
    amenities: ["Natural light", "Wi-Fi", "Parking"],
    overview:
      "A skylit workshop with six pottery wheels, a glazing bench and drying racks. Soft north light all day makes it a good room for craft and process shoots.",
    rating: 4.7,
  },
  {
    title: "Daylight Loft Studio B",
    category: "Photo Studio",
    hourlyRate: 70,
    securityDeposit: 120,
    maxCapacity: 10,
    location: "Bushwick, Brooklyn",
    imageUrl: image(20313879),
    gallery: [image(7206218), image(7318661)],
    amenities: ["Natural light", "Props", "Makeup room", "Wi-Fi"],
    overview:
      "A bright corner loft with seven large windows, hardwood floors and whitewashed brick. A strong location for editorial and brand photography.",
    rating: 4.6,
  },
];

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();

const studioCollection = client.db("studiospace").collection("studios");
const count = await studioCollection.countDocuments();

if (count === 0) {
  await studioCollection.insertMany(
    studios.map((studio, index) => ({
      ...studio,
      ...owner,
      reviews,
      // different dates so "newest first" has a clear order
      createdAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000),
    })),
  );
  console.log("Inserted 6 demo studios");
} else {
  console.log(`The studios collection already has ${count} studios`);
}

await client.close();
