export interface ClassHour {
    id: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
    slot: string;
    teacher_id: number;
    id_user1?: number | null;
    id_user2?: number | null;
    id_user3?: number | null;
    id_user4?: number | null;
    id_user5?: number | null;
};