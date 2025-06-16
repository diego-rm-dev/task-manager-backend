import { Request, Response } from "express";
import { ILabelService } from "../services/label.service";

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
            const label = await this.labelService.createLabel(req.body);
            res.status(201).json(label);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    findLabelById = async (req: Request, res: Response): Promise<void> => {
        try {
            const label = await this.labelService.findLabelById(req.params.id);
            res.status(200).json(label);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    findAllLabels = async (req: Request, res: Response): Promise<void> => {
        try {
            const labels = await this.labelService.findAllLabels();
            res.status(200).json(labels);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    updateLabel = async (req: Request, res: Response): Promise<void> => {
        try {
            const label = await this.labelService.updateLabel(req.params.id, req.body);
            res.status(200).json(label);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    deleteLabel = async (req: Request, res: Response): Promise<void> => {
        try {
            const label = await this.labelService.deleteLabel(req.params.id);
            res.status(200).json(label);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}