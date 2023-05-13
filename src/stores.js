import { writable } from 'svelte/store';

export const userName = writable('[NAME]');
export const userAge = writable(0);
export const userSex = writable(null);
export const userLocation = writable('');
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

export const userMissedMeal = writable(false);
export const userBorrowedMoney = writable(false);
export const userHasDebt = writable(false);
export const userDebtAmt = writable(0);

function validateUserText(value) {
    if (typeof value !== 'string') {
      throw new Error('User text must be a string');
    }
    if (value.length > 100) {
      throw new Error('User text must be 100 characters or less');
    }
    return value;
}


