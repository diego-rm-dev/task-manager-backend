import { Request, Response } from "express";
import { ICollaboratorService } from "../services/collaborator.service";

export interface ICollaboratorController {
    createCollaborator(req: Request, res: Response): Promise<void>;
    findCollaboratorById(req: Request, res: Response): Promise<void>;
    findAllCollaborators(req: Request, res: Response): Promise<void>;
    updateCollaborator(req: Request, res: Response): Promise<void>;
    deleteCollaborator(req: Request, res: Response): Promise<void>;
}

export class CollaboratorController implements ICollaboratorController{
    constructor(private readonly collaboratorService: ICollaboratorService){}

    public async createCollaborator(req: Request, res: Response): Promise<void> {
        try {
            const collaborator = await this.collaboratorService.createCollaborator(req.body);
            res.status(201).json(collaborator);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async findCollaboratorById(req: Request, res: Response): Promise<void> {
        try {
            const collaborator = await this.collaboratorService.findCollaboratorById(req.params.id);
            res.status(200).json(collaborator);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async findAllCollaborators(req: Request, res: Response): Promise<void> {
        try {
            const collaborators = await this.collaboratorService.findAllCollaborators();
            res.status(200).json(collaborators);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async updateCollaborator(req: Request, res: Response): Promise<void> {
        try {
            const collaborator = await this.collaboratorService.updateCollaborator(req.params.id, req.body);
            res.status(200).json(collaborator);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async deleteCollaborator(req: Request, res: Response): Promise<void> {
        try {
            const collaborator = await this.collaboratorService.deleteCollaborator(req.params.id);
            res.status(200).json(collaborator);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}