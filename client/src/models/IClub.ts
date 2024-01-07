export interface IClub extends ClubInput {
    id: number;
    image: string | null;
}

export interface ClubInput {
    title: string;
    description: string;
    source: string;
    phone: string;
    price: number;
    connect: string;
    city: string;
    category: string;
    ownerId: number;
}

export interface ClubImageInput {
    id: number;
    image: Blob;
}