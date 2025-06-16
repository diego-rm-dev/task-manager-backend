import { Request, Response } from "express";
import { ILabelService } from "../services/label.service";
import { ApiError } from "../errors/error.handler";

export interface ILabelController {
    createLabel(req: Request, res: Response): Promise<void>;
    findLabelById(req: Request, res: Response): Promise<void>;
    findAllLabels(req: Request, res: Response): Promise<void>;
    updateLabel(req: Request, res: Response): Promise<void>;
    deleteLabel(req: Request, res: Response): Promise<void>;
}

export class LabelController implements ILabelController {
    constructor(private readonly labelService: ILabelService) {}

    createLabel = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, color } = req.body;
            
            if (!name || !color) {
                throw ApiError.badRequest('Missing required fields', 'Please provide name and color');
            }

            const label = await this.labelService.createLabel(req.body);
            res.status(201).json(label);
        } catch (error: any) {
            throw error;
        }
    }

    findLabelById = async (req: Request, res: Response): Promise<void> => {
        try {
            const label = await this.labelService.findLabelById(req.params.id);
            if (!label) {
                throw ApiError.notFound('Label not found');
            }
            res.status(200).json(label);
        } catch (error: any) {
            throw error;
        }
    }

    findAllLabels = async (req: Request, res: Response): Promise<void> => {
        try {
            const labels = await this.labelService.findAllLabels();
            res.status(200).json(labels);
        } catch (error: any) {
            throw error;
        }
    }

    updateLabel = async (req: Request, res: Response): Promise<void> => {
        try {
            const label = await this.labelService.updateLabel(req.params.id, req.body);
            if (!label) {
                throw ApiError.notFound('Label not found');
            }
            res.status(200).json(label);
        } catch (error: any) {
            throw error;
        }
    }

    deleteLabel = async (req: Request, res: Response): Promise<void> => {
        try {
            const label = await this.labelService.deleteLabel(req.params.id);
            if (!label) {
                throw ApiError.notFound('Label not found');
            }
            res.status(200).json(label);
        } catch (error: any) {
            throw error;
        }
    }
}