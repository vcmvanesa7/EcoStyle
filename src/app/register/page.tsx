"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Button1 from "@/components/UI/button/Button";
import { notification } from "@/utils/notification";
import axios from "axios";

export default function RegisterPage (){

    const router = useRouter();

    const [ formData, setFormData ] = useState({
        usermae: "",
        email: "",
        password: "",
    });
    const [ loading, setLoading ] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try{
            const res= await axios("/api/register", {
                
            })
        }
    }
//estoy configurando services, para que no se llame aquí y entendiendo si usas api.ts 
//para instanciar axios...
//tsx de views...
}