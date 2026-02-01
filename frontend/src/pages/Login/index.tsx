import { Container, VStack, Text, Input, Button, Heading, FormControl, FormLabel, useToast, Link, Box, IconButton, Checkbox, HStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, signUpNewUser } from '../../services/loginService';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

type AuthFormData = {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const getUsername = () => {
    return localStorage.getItem('username');
  }
  const [saveUsernameToStorage, setSaveUsernameToStorage] = useState(getUsername() === null ? false : true)

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<AuthFormData>({
    defaultValues: {
      email: getUsername() || "",
      password: '',
      confirmPassword: '',
      name: '',
    }
  });

  const password = watch('password');
  const email = watch('email');

  const saveUsername = () => {
    if (email) {
      localStorage.setItem('username', email);
    }
  }


  const removeUsername = () => {
    const email = getUsername();
    localStorage.removeItem('username')
    if(!email) return null
    return email
  }

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    if(saveUsernameToStorage) {
      saveUsername()
    } else {
      removeUsername()
    }
    
    try {
      if (isSignUp) {
        if (data.password !== data.confirmPassword) {
          toast({
            title: 'Passwords do not match',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
          return;
        }
        
        if (!data.name) {
          toast({
            title: 'Name is required',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
          return;
        }
        
        await signUpNewUser(data.email, data.password, data.name);
        toast({
          title: 'Account created successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/dashboard');
      } else {
        await loginUser(data.email, data.password);
        toast({
          title: 'Login successful!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      toast({
        title: isSignUp ? 'Signup failed' : 'Login failed',
        description: error.message || 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    reset();
  };

  return (
    <Container maxW="md" p={4}>
      <VStack spacing={4} align="center" justify="center" h="100vh">
        <Heading size="lg">{isSignUp ? 'Sign Up' : 'Login'}</Heading>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <VStack spacing={4} width="100%">
                        {isSignUp && (
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  {...register('name', {
                    required: isSignUp ? 'Name is required' : false,
                  })}
                />
                {errors.name && (
                  <Text color="red.500" fontSize="sm">
                    {errors.name.message}
                  </Text>
                )}
              </FormControl>
            )}
            
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                defaultValue={getUsername() ?? ''}
              />
              {errors.email && (
                <Text color="red.500" fontSize="sm">
                  {errors.email.message}
                </Text>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <HStack>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                />
                <IconButton
                  aria-label="Toggle password visibility"
                  icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </HStack>
              {errors.password && (
                <Text color="red.500" fontSize="sm">
                  {errors.password.message}
                </Text>
              )}
            </FormControl>
            {!isSignUp && (
            <Checkbox isChecked={!!saveUsernameToStorage} onChange={() => setSaveUsernameToStorage(!saveUsernameToStorage)} alignSelf={'flex-start'}>
              Save Username
            </Checkbox>
            )}
            

            {isSignUp && (
              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  {...register('confirmPassword', {
                    required: isSignUp ? 'Please confirm your password' : false,
                    validate: (value) =>
                      !isSignUp || value === password || 'Passwords do not match',
                  })}
                />
                {errors.confirmPassword && (
                  <Text color="red.500" fontSize="sm">
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </FormControl>
            )}

            <Button
              width="100%"
              marginTop={4}
              type="submit"
              colorScheme="blue"
              isLoading={isLoading}
            >
              {isSignUp ? 'Sign Up' : 'Login'}
            </Button>

            <Box textAlign="center">
              <Text fontSize="sm">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <Link color="blue.500" onClick={toggleMode} cursor="pointer">
                  {isSignUp ? 'Login' : 'Sign Up'}
                </Link>
              </Text>
            </Box>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};