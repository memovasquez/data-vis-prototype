import { writable } from 'svelte/store';

export const userName = writable('', validateUserText);
export const userAge = writable(0);
export const userSex = writable(null);
export const userLocation = writable('', validateUserText);
export const userMonthlyIncome = writable(null);
export const userHouseholdSize = writable(null);
export const storyText = writable('');

export const activeSection = writable(0);

export const userFatsSweets = writable(null);
export const userGrains = writable(null);
export const userProtein = writable(null);
export const userVegetables = writable(null);
export const userFruit = writable(null);
export const userDairy = writable(null);

function validateUserText(value) {
    if (typeof value !== 'string') {
      throw new Error('User text must be a string');
    }
    if (value.length > 100) {
      throw new Error('User text must be 100 characters or less');
    }
    return value;
}


