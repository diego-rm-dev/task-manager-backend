import Collaborator, { ICollaborator } from "../models/collaborator.model";

interface ICollaboratorService {
    createCollaborator(collaborator: ICollaborator): Promise<ICollaborator>;
    findCollaboratorById(id: string): Promise<ICollaborator | null>;
    findAllCollaborators(): Promise<ICollaborator[]>;
    updateCollaborator(id: string, collaborator: ICollaborator): Promise<ICollaborator | null>;
    deleteCollaborator(id: string): Promise<ICollaborator | null>;
}

export class CollaboratorService implements ICollaboratorService {
    constructor(private readonly collaboratorModel: typeof Collaborator) {}

    public async createCollaborator(collaborator: ICollaborator): Promise<ICollaborator> {
        try {
            return await this.collaboratorModel.create(collaborator);
        } catch (error: any) {
            throw new Error(`Creation failed: ${error.message}`);
        }
    }

    public async findCollaboratorById(id: string): Promise<ICollaborator | null> {
        try {
            const collaborator = await this.collaboratorModel.findById(id);
            if (!collaborator) {
                throw new Error("Collaborator not found");
            }
            return collaborator;
        } catch (error: any) {
            throw new Error(`Finding collaborator by ID failed: ${error.message}`);
        }
    }

    public async findAllCollaborators(): Promise<ICollaborator[]> {
        try {
            return await this.collaboratorModel.find();
        } catch (error: any) {
            throw new Error(`Finding all collaborators failed: ${error.message}`);
        }
    }

    public async updateCollaborator(id: string, collaborator: ICollaborator): Promise<ICollaborator | null> {
        try {
            const updatedCollaborator = await this.collaboratorModel.findByIdAndUpdate(id, collaborator, { new: true });
            if (!updatedCollaborator) {
                throw new Error("Collaborator not found");
            }
            return updatedCollaborator;
        } catch (error: any) {
            throw new Error(`Updating collaborator failed: ${error.message}`);
        }
    }

    public async deleteCollaborator(id: string): Promise<ICollaborator | null> {
        try {
            const deletedCollaborator = await this.collaboratorModel.findByIdAndDelete(id);
            if (!deletedCollaborator) {
                throw new Error("Collaborator not found");
            }
            return deletedCollaborator;
        } catch (error: any) {
            throw new Error(`Deleting collaborator failed: ${error.message}`);
        }
    }
}