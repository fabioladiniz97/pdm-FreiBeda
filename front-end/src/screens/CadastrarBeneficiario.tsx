import { TouchableOpacity } from "react-native-gesture-handler"
import { NavigationProps } from "../types/navigation"
import { Back } from "../components/Back"
import { Box, Center, FormControl, Heading, Input, ScrollView, VStack, Text } from "native-base"
import { Formik } from "formik"
import createValidator from "class-validator-formik"
import { BeneficiarioDTO } from "../dtos/beneficiario.dto"
import { getToken } from "../services/asyncStorage"
import { api } from "../services/api"
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"
import { AxiosError } from "../types/axiosError"
import { Button } from "../components/Button"

type Props = {
    navigation: NavigationProps,
    route: any
}

export const CadastrarBeneficiario = ({ navigation, route }: Props) => {
    return (
        <>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Osc", route.params)
            }}>
                <Back text="OSC" />
            </TouchableOpacity>
            <ScrollView bg={"#fff"}>
                <Formik
                    validate={createValidator(BeneficiarioDTO)}
                    initialValues={{
                        nome: "",
                        data_Nascimento: "",
                        sexo: "",
                        cor_Declarada: "",
                        is_Menor: "false",
                        responsavel_Menor: "",
                        profissao: "",
                        renda_Mensal: ""
                    }}
                    onSubmit={async (values, { resetForm, setErrors }) => {
                        try {
                            const token = await getToken("@token");
                            const projeto = await api.post(
                                "/beneficiarios/registrarBeneficiarios",
                                {
                                    id: route.params.id,
                                    nome: values.nome,
                                    data_Nascimento: values.data_Nascimento,
                                    sexo: values.sexo,
                                    cor_Declarada: values.cor_Declarada,
                                    is_Menor: values.is_Menor,
                                    responsavel_Menor: values.responsavel_Menor,
                                    profissao: values.profissao,
                                    renda_Mensal: values.renda_Mensal
                                },
                                {
                                    headers: {
                                        authorization: token,
                                    },
                                }
                            );

                            resetForm();
                            Dialog.show({
                                type: ALERT_TYPE.SUCCESS,
                                title: "Atenção",
                                textBody: "Criada com sucesso",
                                button: "Ok",
                                onPressButton() {
                                    navigation.navigate("Osc", {
                                        paramPropKey: "paramPropValue",
                                    });
                                    Dialog.hide();
                                },
                            });
                        } catch (error) {
                            const data = error as AxiosError;
                            setErrors({
                                nome: data.response.data.message,
                            });
                            Dialog.show({
                                type: ALERT_TYPE.DANGER,
                                title: "Atenção",
                                textBody: data.response.data.message,
                                button: "Ok",
                            });
                        }
                    }}
                >
                    {({
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                        <Center w="100%">
                            <Box safeArea p="2" w="100%" maxW="300" py="1/4">
                                <Heading
                                    size="lg"
                                    color="coolGray.800"
                                    _dark={{
                                        color: "warmGray.50",
                                    }}
                                    fontWeight="semibold"
                                >
                                    Cadastrar beneficiário
                                </Heading>
                                <VStack space={5} mt="5">
                                    <FormControl>
                                        <FormControl.Label>Nome</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("nome")}
                                            value={values.nome}
                                            placeholder="Nome do beneficiário"
                                            onChangeText={handleChange("nome")}
                                            type="text"
                                        />
                                        {errors.nome && touched.nome ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.nome}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>Data de Nascimento</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("data_nascimento")}
                                            value={values.data_Nascimento}
                                            placeholder="XX/XX/XX"
                                            onChangeText={handleChange("data_nascimento")}
                                            type="text"
                                        />
                                        {errors.data_Nascimento && touched.data_Nascimento ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.data_Nascimento}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>Sexo</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("sexo")}
                                            value={values.sexo}
                                            placeholder="M"
                                            onChangeText={handleChange("sexo")}
                                            type="text"
                                        />
                                        {errors.sexo && touched.sexo ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.sexo}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>Cor declarada</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("cor_declarada")}
                                            value={values.cor_Declarada}
                                            placeholder="Cor declarada"
                                            onChangeText={handleChange("cor_declarada")}
                                            type="text"
                                        />
                                        {errors.cor_Declarada && touched.cor_Declarada ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.cor_Declarada}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>O beneficiário é menor</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("menor")}
                                            value={values.is_Menor}
                                            placeholder="true"
                                            onChangeText={handleChange("menor")}
                                            type="text"
                                        />

                                        {errors.is_Menor && touched.is_Menor ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.is_Menor}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>Responsável</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("responsavel")}
                                            value={values.responsavel_Menor}
                                            placeholder="Responsável"
                                            onChangeText={handleChange("responsavel")}
                                            type="text"
                                        />

                                        {errors.responsavel_Menor && touched.responsavel_Menor ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.responsavel_Menor}
                                            </Text>
                                        ) : null}
                                    </FormControl>


                                    <FormControl>
                                        <FormControl.Label>Profissão</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("profissao")}
                                            value={values.profissao}
                                            placeholder="Ex: agricultor"
                                            onChangeText={handleChange("profissao")}
                                            type="text"
                                        />

                                        {errors.profissao && touched.profissao ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.profissao}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>Renda mensal</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("renda")}
                                            value={values.renda_Mensal}
                                            placeholder="R$ 1000,00"
                                            onChangeText={handleChange("renda")}
                                            type="text"
                                        />

                                        {errors.renda_Mensal && touched.renda_Mensal ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.renda_Mensal}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <Button onPress={handleSubmit} text={"Cadastrar"} />
                                </VStack>
                            </Box>
                        </Center>
                    )}
                </Formik>
            </ScrollView>
        </>
    )
}