import { ILabel, ILabelResponse } from "../interfaces/label.interface";
import Label from "../models/label.model";

export interface ILabelService {
    createLabel(label: ILabel): Promise<ILabelResponse>;
    findLabelById(id: string): Promise<ILabelResponse | null>;
    findAllLabels(): Promise<ILabelResponse[]>;
    updateLabel(id: string, label: ILabel): Promise<ILabelResponse | null>;
    deleteLabel(id: string): Promise<ILabelResponse | null>;
}

export class LabelService implements ILabelService {
    constructor(private readonly labelModel: typeof Label) {}

    createLabel = async (label: ILabel): Promise<ILabelResponse> => {
        try {
            const newLabel = await this.labelModel.create(label);
            return {
                id: newLabel._id,
                name: newLabel.name,
                color: newLabel.color,
            };
        } catch (error: any) {
            throw new Error(`Creation failed: ${error.message}`);
        }
    }

    findLabelById = async (id: string): Promise<ILabelResponse | null> => {
        try {
            const label = await this.labelModel.findById(id);
            if (!label) {
                throw new Error("Label not found");
            }
            return {
                id: label._id,
                name: label.name,
                color: label.color,
            };
        } catch (error: any) {
            throw new Error(`Finding label by ID failed: ${error.message}`);
        }
    }

    findAllLabels = async (): Promise<ILabelResponse[]> => {
        try {
            const labels = await this.labelModel.find();
            return labels.map((label: ILabel) => ({
                id: label._id,
                name: label.name,
                color: label.color,
            })) as ILabelResponse[];
        } catch (error: any) {
            throw new Error(`Finding all labels failed: ${error.message}`);
        }
    }

    updateLabel = async (id: string, label: ILabel): Promise<ILabelResponse | null> => {
        try {
            const updatedLabel = await this.labelModel.findByIdAndUpdate(id, label, { new: true });
            if (!updatedLabel) {
                throw new Error("Label not found");
            }
            return {
                id: updatedLabel._id,
                name: updatedLabel.name,
                color: updatedLabel.color,
            };
        } catch (error: any) {
            throw new Error(`Updating label failed: ${error.message}`);
        }
    }

    deleteLabel = async (id: string): Promise<ILabelResponse | null> => {
        try {
            const deletedLabel = await this.labelModel.findByIdAndDelete(id);
            if (!deletedLabel) {
                throw new Error("Label not found");
            }
            return {
                id: deletedLabel._id,
                name: deletedLabel.name,
                color: deletedLabel.color,
            };
        } catch (error: any) {
            throw new Error(`Deleting label failed: ${error.message}`);
        }
    }
}