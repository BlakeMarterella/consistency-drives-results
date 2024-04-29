/**
 * Interface for the Habit object stored in Firebase
 */
export interface FB_HABIT {
    name: string;
    color: string;
}

/**
 * Interface for the Entry object stored in Firebase
 */
export interface FB_ENTRY {
    habitIds: string[];
    date: Date;
    notes: string;
}

/**
 * Interface for the User object stored in Firebase
 */
export interface FB_USER {
    id: string,
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    emailVerified?: boolean,
    dateCreated?: string,
}