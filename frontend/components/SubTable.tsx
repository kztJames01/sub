
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SubTable = ({ subscriptions, calculateDaysLeft, handleEdit, handleDelete }: SubTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Cost ($)</TableHead>
                    <TableHead>Renewal Date</TableHead>
                    <TableHead>Days Left</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {subscriptions.map((sub, index) => {
                    const daysLeft = calculateDaysLeft(sub.renewalDate);
                    const progress = ((30 - daysLeft) / 30) * 100; // Assuming 30 days as the max for the progress bar

                    return (
                        <TableRow key={index}>
                            <TableCell>{sub.name}</TableCell>
                            <TableCell>{sub.price.toFixed(2)}</TableCell>
                            <TableCell>{sub.renewalDate}</TableCell>
                            <TableCell>
                                <Progress value={progress} className="h-2 mb-1" /> {/* Use the Progress component */}
                                <span className="text-sm">{daysLeft} days left</span>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleEdit(sub)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDelete(sub)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

export default SubTable;