/**
 * Get valid delivery dates (tomorrow and day after tomorrow)
 */
export const getValidDeliveryDates = () => {
    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);

    return { tomorrow, dayAfter };
};

/**
 * Format date to YYYY-MM-DD for input[type="date"]
 */
export const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
};

/**
 * Format date to a readable string
 */
export const formatDateDisplay = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

/**
 * Validate delivery date
 */
export const isValidDeliveryDate = (dateString) => {
    const { tomorrow, dayAfter } = getValidDeliveryDates();
    const selected = new Date(dateString);
    const tomorrowStr = formatDateForInput(tomorrow);
    const dayAfterStr = formatDateForInput(dayAfter);
    return dateString === tomorrowStr || dateString === dayAfterStr;
};

/**
 * Get today's date formatted
 */
export const getTodayFormatted = () => {
    return formatDateForInput(new Date());
};

/**
 * Get min and max delivery dates
 */
export const getDeliveryDateRange = () => {
    const { tomorrow, dayAfter } = getValidDeliveryDates();
    return {
        min: formatDateForInput(tomorrow),
        max: formatDateForInput(dayAfter),
    };
};
