import { BUSINESS_CONFIG } from '../data/businessConfig';

export interface BusinessStatus {
  isOpen: boolean;
  statusText: 'OPEN NOW' | 'CLOSED NOW';
  statusDetail: string;
  currentDayName: string;
  todayScheduleDisplay: string;
}

export function getBusinessOpenStatus(): BusinessStatus {
  const now = new Date();
  const dayIndex = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = daysOfWeek[dayIndex];

  const todayConfig = BUSINESS_CONFIG.openingHours.schedule.find(
    s => s.day.toLowerCase() === currentDayName.toLowerCase()
  );

  const formatTime = (h: number, m: number) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedH = h % 12 || 12;
    return `${formattedH}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  if (!todayConfig || todayConfig.isClosed || !todayConfig.openTime || !todayConfig.closeTime) {
    // Find next open day
    let nextDayName = 'Monday';
    let nextOpenTime = '5:00 AM';
    for (let i = 1; i <= 7; i++) {
      const nextIdx = (dayIndex + i) % 7;
      const nextDay = daysOfWeek[nextIdx];
      const cfg = BUSINESS_CONFIG.openingHours.schedule.find(s => s.day.toLowerCase() === nextDay.toLowerCase());
      if (cfg && !cfg.isClosed && cfg.openTime) {
        nextDayName = nextDay;
        const [h, m] = cfg.openTime.split(':').map(Number);
        nextOpenTime = formatTime(h, m);
        break;
      }
    }
    return {
      isOpen: false,
      statusText: 'CLOSED NOW',
      statusDetail: `Opens ${nextDayName} at ${nextOpenTime}`,
      currentDayName,
      todayScheduleDisplay: 'Closed Today'
    };
  }

  const [openHour, openMin] = todayConfig.openTime.split(':').map(Number);
  const [closeHour, closeMin] = todayConfig.closeTime.split(':').map(Number);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openHour * 60 + openMin;
  const closeMinutes = closeHour * 60 + closeMin;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  if (isOpen) {
    const minutesLeft = closeMinutes - currentMinutes;
    const hoursLeft = Math.floor(minutesLeft / 60);
    const closeDisplay = formatTime(closeHour, closeMin);
    const detail = hoursLeft > 0 
      ? `Closes today at ${closeDisplay} (${hoursLeft}h left)`
      : `Closes at ${closeDisplay}`;

    return {
      isOpen: true,
      statusText: 'OPEN NOW',
      statusDetail: detail,
      currentDayName,
      todayScheduleDisplay: todayConfig.displayTime
    };
  } else {
    if (currentMinutes < openMinutes) {
      const openDisplay = formatTime(openHour, openMin);
      return {
        isOpen: false,
        statusText: 'CLOSED NOW',
        statusDetail: `Opens today at ${openDisplay}`,
        currentDayName,
        todayScheduleDisplay: todayConfig.displayTime
      };
    } else {
      // After closing today - find tomorrow's opening time
      const tomorrowIdx = (dayIndex + 1) % 7;
      const tomorrowDay = daysOfWeek[tomorrowIdx];
      const tomorrowCfg = BUSINESS_CONFIG.openingHours.schedule.find(
        s => s.day.toLowerCase() === tomorrowDay.toLowerCase()
      );
      
      let nextDetail = 'Opens tomorrow at 5:00 AM';
      if (tomorrowCfg && !tomorrowCfg.isClosed && tomorrowCfg.openTime) {
        const [nextH, nextM] = tomorrowCfg.openTime.split(':').map(Number);
        nextDetail = `Opens tomorrow at ${formatTime(nextH, nextM)}`;
      }

      return {
        isOpen: false,
        statusText: 'CLOSED NOW',
        statusDetail: nextDetail,
        currentDayName,
        todayScheduleDisplay: todayConfig.displayTime
      };
    }
  }
}
