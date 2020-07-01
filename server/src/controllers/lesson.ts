import { Lesson, LessonDocument } from "../models"
import { Request, Response } from 'express';

export const list = async (req: Request, res: Response) => {
    let { category = 'all', offset, limit } = req.query;
    let offset1 = isNaN(Number(offset)) ? 0 : Number(offset);
    let limit1 = isNaN(Number(limit)) ? 5 : Number(limit);
    let query: Partial<LessonDocument> = {};
    if (category && category != 'all') {
        query.category = category as string;
    }
    let total: number = await Lesson.count(query);//符合条件的总条数
    let list: LessonDocument[] = await Lesson.find(query)
        .sort({ order: 1 }).skip(offset1).limit(limit1);
    // 20>0+5:true   20>5+5:true  20>10+5:true 20=15+5:false
    setTimeout(() => {
        res.json({
            success: true,
            data: {
                list,
                hasMore: total > offset1 + limit1
            }
        });
    }, 1000);

}
export const getLesson = async (req: Request, res: Response) => {
    let id = req.params.id;
    let lesson = await Lesson.findById(id);
    res.json({
        success: true,
        data: lesson
    });

}