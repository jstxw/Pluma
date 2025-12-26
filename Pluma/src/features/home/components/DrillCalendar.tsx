/**
 * DrillCalendar - Minimal black & white calendar showing drill completion
 *
 * Design:
 */

import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Colors (strict black & white)
const COLORS = {
  background: '#000000',
  white: '#FFFFFF',
  secondaryText: 'rgba(255, 255, 255, 0.65)',
  tertiaryText: 'rgba(255, 255, 255, 0.45)',
  completedRing: '#FFFFFF',
  currentDay: '#FFFFFF',
};

interface DrillCalendarProps {
  completedDates: string[];
}

export function DrillCalendar({
  completedDates,
}: DrillCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const monthIndex = currentMonth.getMonth();
    
    // Get first day of month and last day of month
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    
    // Get day of week for first day (0 = Sunday, 6 = Saturday)
    // Convert to Monday-based (0 = Monday, 6 = Sunday)
    let startDayOfWeek = firstDay.getDay();
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    
    const daysInMonth = lastDay.getDate();
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Build calendar grid
    const weeks: Array<Array<{
      date: number;
      dateStr: string;
      isCurrentMonth: boolean;
      isToday: boolean;
      isCompleted: boolean;
    } | null>> = [];
    
    let currentWeek: typeof weeks[0] = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push(null);
    }
    
    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = dateStr === todayStr;
      const isCompleted = completedDates.includes(dateStr);
      
      currentWeek.push({
        date: day,
        dateStr,
        isCurrentMonth: true,
        isToday,
        isCompleted,
      });
      
      // Start new week on Sunday
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    
    // Fill remaining cells in last week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }
    
    return {
      monthName: currentMonth.toLocaleString('default', { month: 'short' }),
      year: year,
      weeks,
    };
  }, [currentMonth, completedDates]);

  return (
    <View style={styles.container}>
      {/* Month Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
          <Text style={styles.navArrow}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {calendarData.monthName} {calendarData.year}
        </Text>
        <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
          <Text style={styles.navArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Day Labels */}
      <View style={styles.daysRow}>
        {DAYS.map((day) => (
          <View key={day} style={styles.dayCell}>
            <Text style={styles.dayLabel}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      {calendarData.weeks.map((week, weekIndex) => (
        <View key={weekIndex} style={styles.weekRow}>
          {week.map((day, dayIndex) => (
            <View key={dayIndex} style={styles.dateCell}>
              {day && (
                <View style={styles.dateContainer}>
                  {/* Completed Ring */}
                  {day.isCompleted && (
                    <View style={styles.completedRing} />
                  )}
                  {/* Date Number */}
                  <Text
                    style={[
                      styles.dateText,
                      day.isToday && styles.todayText,
                      !day.isCurrentMonth && styles.otherMonthText,
                    ]}
                  >
                    {day.date}
                  </Text>
                  {/* Today Indicator Background */}
                  {day.isToday && (
                    <View style={styles.todayCircle} />
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  navButton: {
    padding: 8,
    minWidth: 40,
    alignItems: 'center',
  },
  navArrow: {
    fontSize: 28,
    fontWeight: '300',
    color: COLORS.white,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  daysRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.tertiaryText,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dateCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  dateContainer: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  completedRing: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: COLORS.completedRing,
    zIndex: 1,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '400',
    color: COLORS.white,
    zIndex: 2,
  },
  todayText: {
    fontWeight: '600',
    color: COLORS.white,
  },
  todayCircle: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: 0,
  },
  otherMonthText: {
    color: COLORS.tertiaryText,
  },
});
