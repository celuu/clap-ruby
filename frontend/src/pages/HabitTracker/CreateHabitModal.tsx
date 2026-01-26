import { Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Input, Button, ModalFooter, VStack, FormErrorMessage, FormLabel, FormControl } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { createHabit as createHabitService } from '../../services/habitService';
import { Habit } from "@/types";

type CreateHabitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  existingHabit?: Habit;
  onCreated?: (habit: Habit) => void;
};

type HabitFormData = {
  label: string;
  weekly_target: number;
}

export const CreateHabitModal = ({ isOpen, onClose, existingHabit, onCreated }: CreateHabitModalProps) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<HabitFormData>({
    defaultValues: {
      label: existingHabit?.label ?? '',
      weekly_target: existingHabit?.weekly_target ?? 1,
    }
  });

  const formData = watch();

  const onSubmit = async (data: HabitFormData) => {
    await createHabitService({
      label: data.label,
      weekly_target: data.weekly_target,
    });
    onCreated?.(data as Habit);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create Habit</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.label}>
                <FormLabel>Habit</FormLabel>
                <Input
                  placeholder="Habit"
                  {...register('label', { required: true })}
                />
                {errors.label && <FormErrorMessage color="red.500">{errors.label.message}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={!!errors.weekly_target}>
                <FormLabel>Weekly Target</FormLabel>
                <Input
                  placeholder="Weekly Target"
                  type="number"
                  min={1}
                  max={7}
                  {...register('weekly_target', { 
                    required: true, 
                    valueAsNumber: true,
                    min: 1,
                    max: 7
                  })}
                />
              </FormControl>
              {errors.weekly_target && <FormErrorMessage color="red.500">{errors.weekly_target.message}</FormErrorMessage>}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme="blue" disabled={!formData.label}>
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};