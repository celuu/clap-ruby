import { createProfile } from "../../services/userService";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Input, FormLabel, FormControl, Textarea, Button, ModalFooter, HStack, ModalCloseButton, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type UserModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

export type UserFormData = {
  first_name: string;
  last_name: string;
  goals: string;
}
export const UserModal = ({ isOpen, onClose }: UserModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm <UserFormData>()
  const formData = watch();
  const toast = useToast();



  const onSubmit = async (data: UserFormData) => {
  try {
    await createProfile(data);

    toast({
      title: 'Profile created',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    onClose();
  } catch (error: any) {
    toast({
      title: 'Failed to create profile',
      description: error.message,
      status: 'error',
      duration: 4000,
      isClosable: true,
    });
  }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>Before you start, please tell us a bit about yourself!</ModalHeader>
          <ModalBody display={'flex'} gap={'6'} flexDirection={'column'}>
            <HStack>
              <FormControl isRequired width={'50%'}>
                <FormLabel>First Name</FormLabel>
                <Input placeholder="Your name" {...register('first_name', { required: true })} />
              </FormControl>
              <FormControl isRequired width={'50%'}>
                <FormLabel>Last Name</FormLabel>
                <Input placeholder="Your name" {...register('last_name', { required: true })} />
              </FormControl>
            </HStack>
            <FormControl isRequired>
              <FormLabel>What are your goals?</FormLabel>
              <Textarea placeholder="Your goals" {...register('goals', { required: true })} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Save</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};